import { toast } from '../widgets/myToast';

type SettingsType = {
    API_DOMAIN: string
}

// Do something with environment settings
const settings = process.env.APP_SETTINGS as unknown as SettingsType;
const getFullUrl = (urlPath: string): string => settings.API_DOMAIN + urlPath;

function handleErrors(response: Response, successMessage: string) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    toastSuccess(successMessage);
    return response;
}
  
function toastSuccess(message: string) {
    toast.show(message, {
        timeout: 3000,
        position: 'top-right',
        variant: 'success',
    });
}
  
function toastFailure(message: string) {
    toast.show(message, {
        timeout: 3000,
        position: 'top-right',
        variant: 'danger',
    });
}

/**
 * Generic Http GET
 * @param url 
 * @returns 
 */
function httpGet(url: string, successMessage: string) {
    url = getFullUrl(url);
    return fetch(url, {
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => handleErrors(response, successMessage))
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => toastFailure(error));
}

export {
    httpGet
};
