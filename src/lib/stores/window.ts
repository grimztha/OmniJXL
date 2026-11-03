import { writable } from 'svelte/store';

export const isMaximizedStore = writable<boolean>(false);

export async function checkMaximized(): Promise<boolean> {
  try {
    const { invoke } = await import('@tauri-apps/api/core');
    const isMax = await invoke<boolean>('cmd_window_is_maximized');
    isMaximizedStore.set(isMax);
    return isMax;
  } catch {
    try {
      const { getCurrentWindow } = await import('@tauri-apps/api/window');
      const isMax = await getCurrentWindow().isMaximized();
      isMaximizedStore.set(isMax);
      return isMax;
    } catch {
      return false;
    }
  }
}

export async function minimizeWindow(): Promise<void> {
  try {
    const { invoke } = await import('@tauri-apps/api/core');
    await invoke('cmd_window_minimize');
  } catch {
    try {
      const { getCurrentWindow } = await import('@tauri-apps/api/window');
      await getCurrentWindow().minimize();
    } catch (e) {
      console.warn('Minimize failed:', e);
    }
  }
}

export async function toggleMaximizeWindow(): Promise<void> {
  try {
    const { invoke } = await import('@tauri-apps/api/core');
    const isMax = await invoke<boolean>('cmd_window_toggle_maximize');
    isMaximizedStore.set(isMax);
  } catch {
    try {
      const { getCurrentWindow } = await import('@tauri-apps/api/window');
      const win = getCurrentWindow();
      await win.toggleMaximize();
      const isMax = await win.isMaximized();
      isMaximizedStore.set(isMax);
    } catch (e) {
      console.warn('Toggle maximize failed:', e);
    }
  }
}

export async function closeWindow(): Promise<void> {
  try {
    const { invoke } = await import('@tauri-apps/api/core');
    await invoke('cmd_window_close');
  } catch {
    try {
      const { getCurrentWindow } = await import('@tauri-apps/api/window');
      await getCurrentWindow().close();
    } catch (e) {
      console.warn('Close window failed:', e);
    }
  }
}

export type ResizeDirection =
  | 'East'
  | 'North'
  | 'NorthEast'
  | 'NorthWest'
  | 'South'
  | 'SouthEast'
  | 'SouthWest'
  | 'West';

export async function startResize(direction: ResizeDirection): Promise<void> {
  try {
    const { getCurrentWindow } = await import('@tauri-apps/api/window');
    await getCurrentWindow().startResizeDragging(direction);
  } catch {
    // preview or unsupported fallback
  }
}
