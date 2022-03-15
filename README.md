# Hawk Core Monitor

![workflow](https://github.com/TUB-CNPE-TB/hawk-core-monitor/actions/workflows/main.yml/badge.svg)

This project represents the configuration Web-Interface for Hawk Core. Fields and Mappings can be created here.
The dashboard consists of a React application using [Chakra-UI](https://chakra-ui.com) and [Purity UI by CreativeTim](https://github.com/creativetimofficial/purity-ui-dashboard).

## Installation

The Docker-Image features a nginx server to enabled browser-routing in React.

To start the Dashboard just run:
```
docker run -p 80:80 p4skal/hawk-core-monitor
```
**Note: The Dashboard needs a running Hawk-Service instance reverse-proxied on the same port by default.**
**Note: The Grafana Part of the Dashboard is configured in the `Hawk` project via. a Kubernetes deployment.**

To manually specify the `hawk-service` you can pass the `API_URL` environment variable.

See [History](HISTORY.md) for the history of the creation of the UI.
