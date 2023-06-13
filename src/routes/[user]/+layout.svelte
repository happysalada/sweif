<script lang="ts">
  import type { PageData } from "./$types";
  import { user, transactions } from "$lib/stores";
  import { onMount } from "svelte";

  // TODO user login stuff
  import UserNav from "$lib/UserNav.svelte";

  export let data: PageData;
  onMount(async () => {
    let [{result: [userFromDb]}, {result: depositsRaw}, {result: withdrawalsRaw}] = await data.databaseResults;
    let deposits: Deposit[] = depositsRaw.map(it => ({...it, created_at: new Date(it.created_at)}));
    let withdrawals: Withdrawal[] = withdrawalsRaw.map(it => ({...it, created_at: new Date(it.created_at)}));
    user.set(userFromDb)
    let all: Transaction[] = deposits.concat(withdrawals)
    all.sort((a, b) => a.created_at.getTime() - b.created_at.getTime())
    transactions.set(all)
  });
</script>

<UserNav />

<slot />
