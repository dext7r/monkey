function getDate(): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
function createIframe(id: string): HTMLIFrameElement {
  const iframe = document.createElement('iframe')
  iframe.id = id
  iframe.style.position = 'fixed'
  iframe.style.top = '120px'
  iframe.style.right = '24px'
  iframe.style.width = '375px'
  iframe.style.height = '850px'
  iframe.style.zIndex = '1000'
  iframe.src = 'https://juejin.cn/user/center/signin'
  return iframe
}

function removeIframe(id: string) {
  const ele = document.getElementById(id) as HTMLIFrameElement | null
  if (ele)
    document.body.removeChild(ele)
}

function updateBtn() {
  const signInBtn = document.querySelector('.signin-btn')
  if (signInBtn) {
    signInBtn.classList.remove('signin-btn')
    signInBtn.classList.add('signedin-btn')
  }
  const textEle = signInBtn?.querySelector('.btn-text')
  if (textEle) {
    textEle.classList.add('signed-text')
    textEle.textContent = '已签到'
  }
}

async function trySignIn() {
  try {
    const id = `iframe-${Math.ceil(Math.random() * 100)}`
    const iframe = createIframe(id)
    document.body.prepend(iframe)

    iframe.onload = () => {
      const dialog = document.getElementById(id) as HTMLIFrameElement | null
      if (dialog && dialog.contentDocument) {
        const btn = dialog.contentDocument.querySelector<HTMLButtonElement>('.signin.btn')
        if (btn)
          btn.click()

        const timer = setTimeout(() => {
          clearTimeout(timer)
          removeIframe(id)
          updateBtn()
        }, 1000)
      }
    }
  }
  catch (error) {
    console.error('签到失败:', error)
    // 在此处可以进一步处理错误，例如通知用户或重试
  }
}
function checkAndSignIn() {
  const latestDay = localStorage.getItem('juejin-auto-check')
  const today = getDate()
  if (!latestDay || latestDay !== today) {
    trySignIn()
    localStorage.setItem('juejin-auto-check', today)
  }
}
function main() {
  checkAndSignIn()
}
main()
