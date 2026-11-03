<script lang="ts">
  import {
    queueStatsStore,
    throughputStore,
    itemsStore,
    activeFolderStore,
    isProcessingStore,
    clearQueue,
    clearActiveFolder,
  } from '../stores/queue';
  import { Trash2 } from '@lucide/svelte';

  $: hasWork = $itemsStore.length > 0 || $activeFolderStore !== null;

  function handleClear() {
    clearQueue();
    clearActiveFolder();
  }
</script>

<div class="flex items-center justify-between px-2 pt-1 select-none">
  <div class="flex items-center space-x-3">
    <h2 class="text-sm font-semibold tracking-wide text-slate-200 uppercase text-[11px]">
      Conversion Queue
    </h2>
    <span class="text-xs bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded-full border border-white/5">
      {$queueStatsStore.totalCount} items
    </span>
  </div>

  <!-- Overall Batch Progress Stats & Clear Action -->
  <div class="flex items-center space-x-3 text-xs font-mono text-slate-400">
    <div class="flex items-center space-x-1.5">
      <span class="text-slate-400">Saved:</span>
      <span class="text-emerald-400 font-bold">{$queueStatsStore.savedFormatted}</span>
    </div>
    <div class="flex items-center space-x-1.5">
      <span class="text-slate-400">Speed:</span>
      <span class="text-slate-300 font-semibold">{$throughputStore}</span>
    </div>

    <div class="h-3.5 w-px bg-white/10 mx-0.5" aria-hidden="true"></div>

    <button
      type="button"
      on:click={handleClear}
      disabled={$isProcessingStore || !hasWork}
      class="px-2.5 py-1 rounded-lg bg-surface-850 hover:bg-rose-500/15 hover:text-rose-300 hover:border-rose-500/30 border border-white/5 text-slate-300 transition-colors flex items-center space-x-1.5 text-xs font-sans disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
      title="Clear queued items and folders"
    >
      <Trash2 class="w-3.5 h-3.5" />
      <span>Clear</span>
    </button>
  </div>
</div>
