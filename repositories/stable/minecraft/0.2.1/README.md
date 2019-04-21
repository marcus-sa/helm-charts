# `@helm-charts/stable-minecraft`

Minecraft server

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | minecraft |
| Chart Version       | 0.2.1     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# ref: https://hub.docker.com/r/itzg/minecraft-server/
image: itzg/minecraft-server
imageTag: latest

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  requests:
    memory: 512Mi
    cpu: 500m

# Most of these map to environment variables. See Minecraft for details:
# https://hub.docker.com/r/itzg/minecraft-server/
minecraftServer:
  # This must be overridden, since we can't accept this for the user.
  eula: 'FALSE'
  # One of: LATEST, SNAPSHOT, or a specific version (ie: "1.7.9").
  version: 'LATEST'
  # One of: peaceful, easy, normal, and hard
  difficulty: easy
  # A comma-separated list of player names to whitelist.
  whitelist:
  # A comma-separated list of player names who should be admins.
  ops:
  # A server icon URL for server listings. Auto-scaled and transcoded.
  icon:
  # Max connected players.
  maxPlayers: 20
  # This sets the maximum possible size in blocks, expressed as a radius, that the world border can obtain.
  maxWorldSize: 10000
  # Allows players to travel to the Nether.
  allowNether: true
  # Allows server to announce when a player gets an achievement.
  announcePlayerAchievements: true
  # Enables command blocks.
  enableCommandBlock: true
  # If true, players will always join in the default gameMode even if they were previously set to something else.
  forcegameMode: false
  # Defines whether structures (such as villages) will be generated.
  generateStructures: true
  # If set to true, players will be set to spectator mode if they die.
  hardcore: false
  # The maximum height in which building is allowed.
  maxBuildHeight: 256
  # The maximum number of milliseconds a single tick may take before the server watchdog stops the server with the message. -1 disables this entirely.
  maxTickTime: 60000
  # Determines if animals will be able to spawn.
  spawnAnimals: true
  # Determines if monsters will be spawned.
  spawnMonsters: true
  # Determines if villagers will be spawned.
  spawnNPCs: true
  # Max view distance (in chunks).
  viewDistance: 10
  # Define this if you want a specific map generation seed.
  levelSeed:
  # One of: creative, survival, adventure, spectator
  gameMode: survival
  # Message of the Day
  motd: 'Welcome to Minecraft on Kubernetes!'
  # If true, enable player-vs-player damage.
  pvp: false
  # One of: DEFAULT, FLAT, LARGEBIOMES, AMPLIFIED, CUSTOMIZED
  levelType: DEFAULT
  # When levelType == FLAT or CUSTOMIZED, this can be used to further customize map generation.
  # ref: https://hub.docker.com/r/itzg/minecraft-server/
  generatorSettings:
  worldSaveName: world
  # Check accounts against Minecraft account service.
  onlineMode: true
  # If you adjust this, you may need to adjust resources.requests above to match.
  jvmOpts: '-Xmx512M -Xms512M'
  serviceType: LoadBalancer

  rcon:
    # If you enable this, make SURE to change your password below.
    enabled: false
    port: 25575
    password: 'CHANGEME!'
    serviceType: LoadBalancer

persistence:
  ## minecraft data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  dataDir:
    # Set this to false if you don't care to persist state between restarts.
    enabled: true
    Size: 1Gi
```

</details>

---

# Minecraft

[Minecraft](https://minecraft.net/en/) is a game about placing blocks and going on adventures.

## Introduction

This chart creates a single Minecraft Pod, plus Services for the Minecraft server and RCON.

## Prerequisites

- 512 MB of RAM
- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`, read the [Minecraft EULA](https://account.mojang.com/documents/minecraft_eula) run:

```bash
$ helm install --name my-release \
    --set minecraftServer.eula=true stable/minecraft
```

This command deploys a Minecraft dedicated server with sensible defaults.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

Refer to [values.yaml](values.yaml) for the full run-down on defaults. These are a mixture of Kubernetes and Minecraft-related directives that map to environment variables in the [itzg/minecraft-server](https://hub.docker.com/r/itzg/minecraft-server/) Docker image.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
    --set minecraftServer.eula=true,minecraftServer.Difficulty=hard \
    stable/minecraft
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/minecraft
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [itzg/minecraft-server](https://hub.docker.com/r/itzg/minecraft-server/) image stores the saved games and mods under /data.

By default a PersistentVolumeClaim is created and mounted for saves but not mods. In order to disable this functionality
you can change the values.yaml to disable persistence under the sub-sections under `persistence`.

> _"An emptyDir volume is first created when a Pod is assigned to a Node, and exists as long as that Pod is running on that node. When a Pod is removed from a node for any reason, the data in the emptyDir is deleted forever."_
