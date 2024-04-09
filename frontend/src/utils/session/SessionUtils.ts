// Function to write an access token to local storage
function writeAccessToken(token: string): void {
    localStorage.setItem('access_token', token);
}

// Function to read an access token from local storage
function readAccessToken(): string | null {
    return localStorage.getItem('access_token');
}


export { writeAccessToken, readAccessToken };