# sdks-auth-consent-test-page
A GitHub hosted webpage used by the SDK to showcase and test authenticated consent

Make sure to load the page's url with the following query params:
```
https://sourcepointusa.github.io/sdks-auth-consent-test-page/?_sp_version=4.9.0&_sp_pass_consent=true
```

* `_sp_pass_consent`: this will instruct the web script to wait for the consent to be injected before "talking" to SP endpoints and loading a message.
* `_sp_version`: will tell the web script inserted in the page to use that specific version (containing the consent injection feature).