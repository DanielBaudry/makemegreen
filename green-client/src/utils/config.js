
import { getMobileOperatingSystem } from '../helpers'

export const THUMBS_URL =
    process.env.THUMBS_URL || 'http://localhost/storage/assets/'

export const API_URL = process.env.API_URL || 'http://localhost'
export const PERSIST_STORE_KEY = 'makemegreen-webapp'
export const PERSIST_WHITE_LIST = [
    // 'user',
    // 'data'
]

const NODE_ENV = process.env.NODE_ENV || 'development'

export const MOBILE_OS = getMobileOperatingSystem()
export const IS_DEV = NODE_ENV === 'development'
export const IS_PROD = !IS_DEV

let calculatedLocalhost
if (typeof window !== 'undefined') {
    calculatedLocalhost =
        window.location.hostname === 'localhost' ||
        // [::1] is the IPv6 localhost address.
        window.location.hostname === '[::1]' ||
        // 127.0.0.1/8 is considered localhost for IPv4.
        window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
        )
}

export const IS_LOCALHOST = Boolean(calculatedLocalhost)

// FIXME -> document.body.className should be removed using React.Helmet
let CALC_ROOT_PATH = ''
if (typeof window !== 'undefined' && window.cordova) {
    document.body.className += ' cordova'
    if (MOBILE_OS === 'android') {
        CALC_ROOT_PATH = 'file:///android_asset/www'
        document.body.className += ' cordova-android'
        // document.body.className += ' android-with-statusbar'
    } else if (MOBILE_OS === 'ios') {
        // TODO
        document.body.className += ' cordova-ios'
        // FIXME -> Si ici on applique pas la regle des ';'
        // L'application plante en respectant la regle eslint.prefer-destructuring
        // CALC_ROOT_PATH = window.location.href.split('/').slice(0, 10).join('/')
        CALC_ROOT_PATH = window.location.href.match(/file:\/\/(.*)\/www/)[0]
    }
    window.addEventListener('keyboardWillShow', () => {
        window.log('Keyboard show')
        document.body.className += ' softkeyboard'
    })
    window.addEventListener('keyboardWillHide', () => {
        window.log('Keyboard Hide')
        document.body.className = document.body.className
            .split(' ')
            .filter(c => c !== 'softkeyboard')
            .join(' ')
    })
} else if (typeof window !== 'undefined') {
    CALC_ROOT_PATH = `${window.location.protocol}//${document.location.host}`
}

export const ROOT_PATH = CALC_ROOT_PATH || 'http://localhost:3000/'
