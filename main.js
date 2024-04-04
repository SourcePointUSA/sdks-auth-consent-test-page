const params = new URLSearchParams(window.location.search)
const accountId = params.get('accountId') || 22
const propertyId = params.get('propertyId') || 16893
const propertyName = params.get('propertyName') || 'mobile.multicampaign.demo'
const campaigns = JSON.parse(params.get('campaigns') || `{"gdpr":{},"ccpa":{}}`)

window._sp_queue = []
window._sp_ = {
    config: {
        accountId,
        propertyId,
        ...campaigns,
        baseEndpoint: 'https://cdn.privacy-mgmt.com',
        propertyHref: `https://${propertyName}`,
        events: {
            onConsentReady: (campaignType, uuid, consent) => {
                postMessage({
                    name: 'onConsentReady',
                    payload: { campaignType, uuid, consent }
                }, '*')
                getUSPData().then(console.log)
            },
            onError: (...args) => postMessage({ name: 'onError', payload: { ...args } }, '*')
        }
    }
}

window.addEventListener('message', (event) => {
    const pmPre = document.getElementById("postMessage")
    if(event.data !== undefined && event.data !== "undefined") {
        pmPre.innerText = `${JSON.stringify(event.data, null, 2)}\n\n${pmPre.innerText}`
    }
})

window.getUSPData = () => new Promise((resolve, reject) => {
    if(__uspapi !== undefined && typeof __uspapi === "function") {
        __uspapi('getUSPData', 1 , (uspData, success) => {
            success ? resolve(uspData) : reject()
        })
    } else {
        console.warn("__uspapi not available")
        reject()
    }
})