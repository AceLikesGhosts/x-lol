# API Documentation.

> This is a horrible way of doing this, someone find something better please, I'm willing to make another website. I beg of you, someone.
> -- Ace

***


# Routes:

- All routes are (/api)!



## /

Basic route to test if the API is running, it should return a JSON object.

Returns (JSON Object):

```json
{
    ok: true,
    message: 'Request recieved',
    status: 200
}
```

***


## /register

Registers a new user to the website.

Expects (body content, all plain text):

```json
{
    username: 'example_username',
    password: 'example_password',
    invcode: 'example_invite_code',
}
```

Returns:

(If a bad username, password, or invite code was provided.)

```json
ok: false, 
message: 'Missing params.', 
status: 400
```

If it happens successfully, then it will redirect to `/dashboard` if it's a user account, or `/admin` if it's an admin account, or account with level 3 permissions.

***


## /login

(If a bad username and password are provided.)
```json
{
    ok: false, 
    message: 'Failed to login.', 
    status: 400
}
```

OR where 'info' is the Mongo error:

```json
{
    ok: false, 
    message: info, 
    status: 400
}
```

If it happens successfully, then it will redirect to `/dashboard` if it's a user account, or `/admin` if it's an admin account, or account with level 3 permissions.