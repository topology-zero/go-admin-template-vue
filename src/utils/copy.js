import { ElMessage } from 'element-plus'
import Clipboard from 'clipboard'

export default function handleClipboard(text, event) {
    const clipboard = new Clipboard(event.target, {
        text: () => text
    })
    clipboard.on('success', () => {
        ElMessage.success('已复制到剪贴板')
        clipboard.destroy()
    })
    clipboard.on('error', () => {
        ElMessage.error('复制到剪贴板失败')
        clipboard.destroy()
    })
    clipboard.onClick(event)
}
