// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		declare module '$env/static/public' {
			export const PUBLIC_SUPABASE_ANON_KEY: string;
			export const PUBLIC_SUPABASE_URL: string;
		}
		interface Locals {
			sb: TypedSupabaseClient
			session: Session | null
		}
	}
}

export {};
