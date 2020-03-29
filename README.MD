
# run
install .net core >3.1 and execute this commands:

    dotnet user-secrets set "GoogleMapsApiKey" "Meinkey"
    dotnet run


# http proxy

Http proxy for github. px.exe is in this directory.

    px.exe

# set proxy for git

    git config --global http.proxy http://127.0.0.1:3128

# remove proxy from git

    git config --global --unset http.proxy