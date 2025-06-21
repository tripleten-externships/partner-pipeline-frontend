# FLOW OF USER-LOGIN

Flow will take inspiration from the process used in the [se_project_react](../../../../aaron/OneDrive/Documents/TripleTen/Project%20Materials/Project-Files/se_project_react/se_project_react/) project.

User will be logged in upon loading the page when there is a valid token available. If no token is found, return from the `useEffect` and continue with program flow. User will have to log in.

When page is loaded, a `useEffect()` with no dependencies is run.

Consider the following `useEffect()` call:

    useEffect(() => {
        const token = getToken();
        if (!token) return;

        auth
        .getUserInfo(token)
        .then((res) => {
            const { name, email, avatar, _id } = res;
            setIsLoggedIn(true);
            setUserData({ name, email, avatar, _id });
            navigate("//");
        })
        .catch(auth.responseError);
    }, []);

It uses calls to the following methods which are defined below:

- `getToken()`
- `auth.getUserInfo(token)`
- `setIsLoggedIn(true)` useState function
- `setUserData({name, email, avatar, _id})` useState function
- `navigate` object which uses the `useNavigate()` hook

## `getToken()`

Found in [token.js](../../../../aaron/OneDrive/Documents/TripleTen/Project%20Materials/Project-Files/se_project_react/se_project_react/src/utils/token.js)

## `auth.getUserInfo(token)`

Found in [auth.js](../../../../aaron/OneDrive/Documents/TripleTen/Project%20Materials/Project-Files/se_project_react/se_project_react/src/utils/auth.js)
