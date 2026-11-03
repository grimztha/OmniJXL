<script lang="ts">
  import {
    legacyStatsStore,
    throughputStore,
    legacyItemsStore,
    legacyActiveFolderStore,
    isLegacyProcessingStore,
    clearLegacyQueue,
    clearLegacyActiveFolder,
  } from '../stores/queue';
  import { History, Trash2 } from '@lucide/svelte';

  $: hasWork = $legacyItemsStore.length > 0 || $legacyActiveFolderStore !== null;

  function handleClear() {
    clearLegacyQueue();
    clearLegacyActiveFolder();
  }
</script>

<div class="flex items-center justify-between px-2 pt-1 select-none">
  <div class="flex items-center space-x-3">
    <h2 class="text-sm font-semibold tracking-wide text-slate-200 uppercase text-[11px] flex items-center space-x-1.5">
      <History class="w-3.5 h-3.5 text-amber-400" />
      <span>Unpack Queue</span>
    </h2>
    <span class="text-xs bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded-full border border-white/5">
      {$legacyStatsStore.totalCount} items
    </span>
  </div>

  <div class="flex items-center space-x-3 text-xs font-mono text-slate-400">
    <div class="flex items-center space-x-1.5">
      <span class="text-slate-400">Completed:</span>
      <span class="text-emerald-400 font-bold">{$legacyStatsStore.completedCount} / {$legacyStatsStore.totalCount}</span>
    </div>

    <div class="h-3.5 w-px bg-white/10 mx-0.5" aria-hidden="true"></div>

    <button
      type="button"
      on:click={handleClear}
      disabled={$isLegacyProcessingStore || !hasWork}
      class="px-2.5 py-1 rounded-lg bg-surface-850 hover:bg-rose-500/15 hover:text-rose-300 hover:border-rose-500/30 border border-white/5 text-slate-300 transition-colors flex items-center space-x-1.5 text-xs font-sans disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
      title="Clear unpack queue and folders"
    >
      <Trash2 class="w-3.5 h-3.5" />
      <span>Clear</span>
    </button>
  </div>
</div>
