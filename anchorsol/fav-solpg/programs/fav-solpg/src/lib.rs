use anchor_lang::prelude::*;

declare_id!("GRFRYELLZ8jHKp3YvGULb5yy79hGw6K33A7xS2bbEcBd"); // solana will create at run time

pub const ANCHOR_DISCRIMINATOR_SIZE: usize = 8;

#[program]
pub mod fav_solpg {
    use super::*;

    pub fn set_favorites(
        context: Context<SetFavorites>,
        number: u64,
        color: String,
        hobbies: Vec<String>,
    ) -> Result<()> {
        msg!("Greets from to {}", context.program_id);

        let user_public_key = context.accounts.user.key();

        msg!(
            "User Pub Key is {} fav number is {}, fav color is {}, fav hobbies are {:?}",
            user_public_key,
            number,
            color,
            hobbies
        );

        context.accounts.favorites.set_inner(Favorites {
            number,
            color,
            hobbies,
        });

        Ok(())
    }
}

#[account]
#[derive(InitSpace)]
pub struct Favorites {
    pub number: u64,

    #[max_len(50)]
    pub color: String,

    #[max_len(5, 50)]
    pub hobbies: Vec<String>,
}
#[derive(Accounts)]
pub struct SetFavorites<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        init_if_needed,
        payer = user,
        space = ANCHOR_DISCRIMINATOR_SIZE + Favorites::INIT_SPACE,
        seeds = [b"favorites", user.key().as_ref()],
        bump
    )]
    pub favorites: Account<'info, Favorites>,

    pub system_program: Program<'info, System>,
}








// use anchor_lang::prelude::*;

// declare_id!("DDuXSfuwe2vkNEHpfs6WVELhg3eNhj3MEUiSSb99WTk1");

// #[program]
// pub mod fav_solpg {
//     use super::*;

//     pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
//         msg!("Greetings from: {:?}", ctx.program_id);
//         Ok(())
//     }
// }

// #[derive(Accounts)]
// pub struct Initialize {}
