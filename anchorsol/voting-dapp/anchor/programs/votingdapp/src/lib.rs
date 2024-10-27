#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("DLw5fJNrrBCWoy75aukoDApBZm4MEvaWCvPJoqtLSg1p");

#[program]
pub mod votingdapp {
    use super::*;

    pub fn initialize_poll(ctx: Context<InitializePoll>,
            poll_id: u64,
            desc: String,
            poll_start: u64,
            poll_end: u64 )   -> Result<()> {

        let poll = &mut ctx.accounts.poll;
        poll.poll_id = poll_id;
        poll.desc = desc;
        poll.poll_start = poll_start;
        poll.poll_end = poll_end;
        poll.candidate_amount = 0;

        Ok(())
    }

}


#[account]
#[derive(InitSpace)]
pub struct Poll {

    pub poll_id: u64,
    #[max_len(200)]
    pub desc: String,
    pub poll_start: u64,
    pub poll_end: u64,
    pub candidate_amount: u64,

}


#[derive(Accounts)]
#[instruction(poll_id: u64)]
pub struct InitializePoll<'info> {

    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        init,
        payer = signer,
        space = 8 + Poll::INIT_SPACE,
        seeds = [b"poll",signer.key().as_ref()],
        bump,
    )]
    pub poll: Account<'info,Poll>,

    pub system_program: Program<'info, System>,
}

