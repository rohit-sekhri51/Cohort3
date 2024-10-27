fn main() {
    println!("Hello, world!");

    pub fn set_favorites(
        context: Context<SetFavorites>,
        number: u64,
        color: String,
        hobbies: Vec<String>,
    ) -> Result<()> {
        let user_public_key = context.accounts.user.key();
        msg!("User Public Key: {}", user_public_key);
        
        let (pda, bump) = Pubkey::find_program_address(
            &[b"favorites", user_public_key.as_ref()],
            context.program_id
        );
        msg!("Calculated PDA: {}, with bump: {}", pda, bump);
        msg!("Actual PDA being used: {}", context.accounts.favorites.key());
    
        // ... rest of your function
    }

}
