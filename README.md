# Hawk Core Monitor

We published Hawk at the 16th IEEE International Conference on Cloud Computing 2023, IEEE Cloud 2023.
Please find our paper on Hawk here: https://arxiv.org/abs/2306.02496

## BibTex citation:
```
@misc{grünewald2023hawk,
      title={Hawk: DevOps-driven Transparency and Accountability in Cloud Native Systems}, 
      author={Elias Grünewald and Jannis Kiesel and Siar-Remzi Akbayin and Frank Pallas},
      year={2023},
      eprint={2306.02496},
      archivePrefix={arXiv},
      primaryClass={cs.DC}
}
```
## Overview

![workflow](https://github.com/PrivacyEngineering/hawk-core-monitor/actions/workflows/main.yml/badge.svg)

This project represents the configuration Web-Interface for Hawk Core. Fields and Mappings can be created here. The
dashboard consists of a React application using [Chakra-UI](https://chakra-ui.com)
and [Purity UI by CreativeTim](https://github.com/creativetimofficial/purity-ui-dashboard).

## Installation

The Docker-Image features a nginx server to enabled browser-routing in React.

To start the Dashboard just run:

```
docker run -e API_URL=http://localhost:8000 -p 80:80 ghcr.io/privacyengineering/hawk-core-monitor
```

**Note: The Dashboard needs a running Hawk-Service instance reverse-proxied on the same port by default.**
**Note: The Grafana Part of the Dashboard is configured in
the [Hawk project](https://github.com/PrivacyEngineering/hawk) via. a Kubernetes deployment.**

To manually specify the `hawk-service` you can pass the `API_URL` environment variable.

See [History](HISTORY.md) for the history of the creation of the UI.
