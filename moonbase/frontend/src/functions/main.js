export const useTitleEffect = (title) => {
    document.title = title
};

export const localExport = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
}

export const localImport = () => {
    const idea = JSON.parse(localStorage.getItem("user"));

    if (idea === null) return null;

    return idea;
}

export const usePathCallback = () => {
    return window.location.pathname;
}

export const usePath = (pathname) => {
    window.location.href = pathname
}

export const nullPathCheck = () => {
    if (window.location.pathname === "/") {
        window.location.pathname = "/home";
    }
}

export const secureRun = () => {
    console.log(localStorage.getItem("user"));
    if (localStorage.getItem("user") === null || localStorage.getItem("user") === undefined || localStorage.getItem("user") === "undefined") {
        window.location.pathname = "/login";
    };
}