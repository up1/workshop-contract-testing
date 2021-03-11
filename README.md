# Workshop contract testing with [Pact](https://docs.pact.io/) + NodeJS

### Step 1 :: starter project (provider and consumer)
* Go to branch :: [step 1](https://github.com/up1/workshop-contract-testing/tree/step-01)

```
$npm install

// Start provider
$node provider
Provider Service listening on http://localhost:3001

// Start consumer
$node consumer
{ count: 0.1, date: '2020-01-12T11:37:22+07:00' }
```

### Step 2 :: Mock network testing with Nock
* Go to branch :: [step 2](https://github.com/up1/workshop-contract-testing/tree/step-02)
```
$npm run test:comsumer
```

### Step 3 :: Consumer contract testing with Pact
* Go to branch :: [step 3](https://github.com/up1/workshop-contract-testing/tree/step-03)
```
$npm run test:consumer:pact
```

### Step 4 :: Working with [Pact Broker](https://docs.pact.io/pact_broker)

Build and Start Pact broker
```
$cd broker
$docker-compose build
$docker-compose up -d
$docker-compose ps

        Name                      Command               State           Ports
--------------------------------------------------------------------------------------
broker_pact_broker_1   sh /app/wait-for.sh postgr ...   Up      0.0.0.0:9292->9292/tcp
broker_postgres_1      docker-entrypoint.sh postgres    Up      5432/tcp
```

Open broker server in url=http://localhost:9292/
* username=`username`
* password=`password`

Publish contract to Pact broker
```
$node publish
```
