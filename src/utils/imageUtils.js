export const getImageFromIndex = (index, isDisabled) => {
    console.log('INDEX', index)
    switch (index) {
        case 0:
            if(isDisabled) {
                return require('../images/tref-disabled.png')
            } else {
                return require('../images/tref.png')
            }
        case 1:
            
            if(isDisabled) {
                return require('../images/pik-disabled.gif')
            } else {
                return require('../images/pik.gif')
            }
        case 2: 
            if(isDisabled) {
                return require('../images/herc-disabled.gif')
            } else {
                return require('../images/herc.gif')
            }
        case 3:
            if(isDisabled) {
                return require('../images/kara-disabled.gif')
            } else {
                return require('../images/kara.gif')
            }
        default:
            return ''
    }
}

