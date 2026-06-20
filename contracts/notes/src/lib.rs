#![no_std]

use soroban_sdk::{
    contract,
    contractimpl,
    contracttype,
    symbol_short,
    Env,
    String,
    Symbol,
    Vec,
};

#[contracttype]
#[derive(Clone, Debug)]
pub struct Donation {
    id: u64,
    donor: String,
    amount: u64,
}

const DONATION_DATA: Symbol = symbol_short!("DONATE");

#[contract]
pub struct DonationContract;

#[contractimpl]
impl DonationContract {

    // Ambil semua data donasi
    pub fn get_donations(env: Env) -> Vec<Donation> {
        env.storage()
            .instance()
            .get(&DONATION_DATA)
            .unwrap_or(Vec::new(&env))
    }

    // Tambah donasi baru
    pub fn donate(
        env: Env,
        donor: String,
        amount: u64,
    ) -> String {

        let mut donations: Vec<Donation> = env
            .storage()
            .instance()
            .get(&DONATION_DATA)
            .unwrap_or(Vec::new(&env));

        let donation = Donation {
            id: env.prng().gen::<u64>(),
            donor,
            amount,
        };

        donations.push_back(donation);

        env.storage()
            .instance()
            .set(&DONATION_DATA, &donations);

        String::from_str(&env, "Donasi berhasil ditambahkan")
    }

    // Total seluruh donasi
    pub fn get_total_donation(env: Env) -> u64 {

        let donations: Vec<Donation> = env
            .storage()
            .instance()
            .get(&DONATION_DATA)
            .unwrap_or(Vec::new(&env));

        let mut total: u64 = 0;

        for i in 0..donations.len() {
            total += donations.get(i).unwrap().amount;
        }

        total
    }

    // Jumlah donasi yang masuk
    pub fn get_donation_count(env: Env) -> u64 {

        let donations: Vec<Donation> = env
            .storage()
            .instance()
            .get(&DONATION_DATA)
            .unwrap_or(Vec::new(&env));

        donations.len() as u64
    }
}

mod test;