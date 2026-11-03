pub mod commands;
pub mod engine;

use commands::*;

#[cfg(target_os = "windows")]
fn apply_windows_corner_preference(window: &tauri::WebviewWindow) {
    if let Ok(hwnd) = window.hwnd() {
        const DWMWA_WINDOW_CORNER_PREFERENCE: u32 = 33;
        const DWMWCP_ROUND: i32 = 2;
        #[link(name = "dwmapi")]
        unsafe extern "system" {
            fn DwmSetWindowAttribute(
                hwnd: *mut std::ffi::c_void,
                dwAttribute: u32,
                pvAttribute: *const std::ffi::c_void,
                cbAttribute: u32,
            ) -> i32;
        }
        unsafe {
            let preference = DWMWCP_ROUND;
            let _ = DwmSetWindowAttribute(
                hwnd.0 as *mut _,
                DWMWA_WINDOW_CORNER_PREFERENCE,
                &preference as *const _ as *const _,
                std::mem::size_of::<i32>() as u32,
            );
        }
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .setup(|app| {
            #[cfg(target_os = "windows")]
            {
                use tauri::Manager;
                if let Some(window) = app.get_webview_window("main") {
                    apply_windows_corner_preference(&window);
                }
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            cmd_get_system_info,
            cmd_inspect_images,
            cmd_convert_single,
            cmd_convert_batch,
            cmd_select_folder,
            cmd_select_files,
            cmd_open_folder,
            cmd_scan_folder_summary,
            cmd_scan_folder_jxl_summary,
            cmd_select_jxl_files,
            cmd_convert_legacy_single,
            cmd_convert_legacy_batch,
            cmd_handle_dropped_paths,
            cmd_convert_folder_batch,
            cmd_convert_legacy_folder_batch,
            cmd_cancel_batch,
            cmd_window_minimize,
            cmd_window_toggle_maximize,
            cmd_window_close,
            cmd_window_is_maximized,
        ])
        .run(tauri::generate_context!())
        .expect("error while running OmniJXL application");
}
