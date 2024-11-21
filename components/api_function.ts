const BASE_URL = "https://velbots.shop";

export async function callRegisterApi(username: string, password: string) {
    const url = `${BASE_URL}/auth/register`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    return response;
}

export async function callLoginApi(username: string, password: string) {
    const url = `${BASE_URL}/auth/login`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    return response;
}

export async function callPaymentSuccessApi(sessionId: string) {
    const url = `${BASE_URL}/auth/payment/success?session_id=${sessionId}`;
    return await fetch(url);
}

export async function callPaymentCancelApi() {
    const url = `${BASE_URL}/auth/payment/cancel`;
    return await fetch(url);
}

export async function callCreateCheckoutSessionApi(token: string, months: number = 1) {
    const url = `${BASE_URL}/auth/create-checkout`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ months })
    });
    return response;
}

export async function callRegisterHwidApi(token: string, hwid: string) {
    const url = `${BASE_URL}/auth/register-hwid`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ hwid })
    });
    return response;
}

export async function callGetHwidApi(token: string) {
    const url = `${BASE_URL}/auth/hwid`;
    return await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
}

export async function callProfileApi(token: string) {
    const url = `${BASE_URL}/auth/profile`;
    return await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
}

export async function callCheckSubscriptionApi(token: string) {
    const url = `${BASE_URL}/auth/check-subscription`;
    return await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
}

export async function callIsSubscribedApi(token: string) {
    const url = `${BASE_URL}/auth/is-subscribed`;
    return await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
}

export async function callGetBannedStatusApi(token: string) {
    const url = `${BASE_URL}/auth/is-banned`;
    return await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
}

export async function callBanUserApi(token: string) {
    const url = `${BASE_URL}/auth/ban`;
    try {
        const [, payload] = token.split('.');
        const padding = '='.repeat((4 - payload.length % 4) % 4);
        const decoded = JSON.parse(atob(payload + padding));
        const userId = decoded.id || decoded.sub;

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
        });
        return response;
    } catch (error) {
        console.error('[ERROR] Ban request failed:', error);
        throw error;
    }
}