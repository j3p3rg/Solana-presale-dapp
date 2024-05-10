
use anchor_lang::prelude::*;

declare_id!("Fg6PaF8VFq6gUhinq1qt7znkemXui3eYcmPQPKzDWvQy");

#[program]
pub mod presale_contract {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>, presale_duration: u64) -> ProgramResult {
        let presale_account = &mut ctx.accounts.presale_account;
        presale_account.total_raised = 0;
        presale_account.presale_end = Clock::get().unwrap().unix_timestamp as u64 + presale_duration;
        Ok(())
    }

    pub fn invest(ctx: Context<Invest>, amount: u64) -> ProgramResult {
        let presale_account = &mut ctx.accounts.presale_account;
        require!(Clock::get().unwrap().unix_timestamp as u64 <= presale_account.presale_end, ErrorCode::PresaleEnded);
        presale_account.total_raised += amount;
        Ok(())
    }
}

#[account]
pub struct PresaleAccount {
    pub total_raised: u64,
    pub presale_end: u64,
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 16)]
    pub presale_account: Account<'info, PresaleAccount>;
    #[account(mut)]
    pub user: Signer<'info>;
    pub system_program: Program<'info, System>;
}

#[derive(Accounts)]
pub struct Invest<'info> {
    #[account(mut)]
    pub presale_account: Account<'info, PresaleAccount>;
}

#[error]
pub enum ErrorCode {
    #[msg("The presale has already ended.")]
    PresaleEnded,
}
