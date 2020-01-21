## Find the perfect weather match for your current city, search by custom parameters, and more!

<p align="center">
<img alt="GitHub repo size" src="https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&url=https://img.shields.io/github/repo-size/theodor1289/weather-match">
<img alt="Sonar Lines of Code" src="https://sonarcloud.io/api/project_badges/measure?project=com.weathermatch%3Aweather-match&metric=ncloc">
</p>

<p align="center">
<img alt="Travis (.org)" src="https://travis-ci.org/theodor1289/weather-match.svg?branch=master">
<img alt="Sonar Quality Gate Status" src="https://sonarcloud.io/api/project_badges/measure?project=com.weathermatch%3Aweather-match&metric=alert_status">
</p>

<p align="center">
  <img alt="Maintainability rating" src="https://sonarcloud.io/api/project_badges/measure?project=com.weathermatch%3Aweather-match&metric=sqale_rating">  
<img alt="Sonar Code Smells" src="https://sonarcloud.io/api/project_badges/measure?project=com.weathermatch%3Aweather-match&metric=code_smells">
<img alt="Sonar Tech Debt" src="https://sonarcloud.io/api/project_badges/measure?project=com.weathermatch%3Aweather-match&metric=sqale_index">
</p>

<p align="center">
<img alt="Sonar reliability rating" src="https://sonarcloud.io/api/project_badges/measure?project=com.weathermatch%3Aweather-match&metric=reliability_rating">
<img alt="Sonar Tests" src="https://img.shields.io/sonar/tests/com.weathermatch:weather-match?compact_message&server=https%3A%2F%2Fsonarcloud.io">
<img alt="Sonar Coverage" src="https://sonarcloud.io/api/project_badges/measure?project=com.weathermatch%3Aweather-match&metric=coverage">
</p>

<p align="center">
<img alt="Sonar Security" src="https://sonarcloud.io/api/project_badges/measure?project=com.weathermatch%3Aweather-match&metric=security_rating">
<img alt="Security vulnerabilities" src="https://sonarcloud.io/api/project_badges/measure?project=com.weathermatch%3Aweather-match&metric=vulnerabilities">
</p>

<p align="center">
<img alt="Swagger Validator" src="http://online.swagger.io/validator?url=https://raw.githubusercontent.com/theodor1289/weather-match/master/server/api-docs.json">
</p>

<!-- This strategy might speed up badge load time:
data-canonical-src="https://camo.githubusercontent.com/33d3e494efd825b30be8a82ec48164c88ca6ebbf/68747470733a2f2f696d672e736869656c64732e696f2f736f6e61722f76696f6c6174696f6e732f636f6d2e776561746865726d617463683a776561746865722d6d617463683f7365727665723d6874747073253341253246253246736f6e6172636c6f75642e696f" -->

## How to install:
### 1. Start the database (see details in the 'database instructions' folder)

### 2. Boot the webapp (SpringBoot server & React client interface)
requirements: `Java 1.8` `Apache Maven`

2a. First step in booting webapp:
Create a file `webapp/src/main/resources/application.properties` and populate it with the following:
```
# replace this mock key with your own OpenWeatherMap API key
owm.api.key=REPLACE_WITH_YOUR_KEY
json.cities.path=src/main/resources/city-list.json

# PostgreSQL
# set this to 'true' only when initializing the database with empty cities:
initialize.database=true
spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.PostgreSQLDialect
# this allows the schema file to create the repository, and not hibernate (which will overwrite the data that we're then going to inject from our data.sql file)
spring.jpa.hibernate.ddl-auto=none
# URL of the Postgres DB. It can be a remote DB as well.
spring.datasource.url=jdbc:postgresql://localhost:5432/weathermatch
spring.datasource.username=postgres
spring.datasource.password=postgres
# we want initialization of the database to happen on every startup
spring.datasource.initialization-mode=always
# the schema path that needs to be initialized:
spring.datasource.schema=classpath:/schema.sql
# will continue application startup in spite of any errors in data initialization
spring.datasource.continue-on-error=true
spring.jpa.properties.hibernate.jdbc.batch_size = 60
spring.jpa.properties.hibernate.order_inserts = true
spring.jpa.properties.hibernate.order_updates = true
#hibernate.jdbc.fetch_size = 400 ?

# INFO ACTUATOR ENDPOINT
info.app.name=@project.name@
info.app.description=@project.description@
info.app.version=@project.version@
info.app.encoding=@project.build.sourceEncoding@
info.app.java.version=@java.version@
# HEALTH ACTUATOR ENDPOINT
management.endpoint.health.show-details=when_authorized
management.endpoint.health.roles=ADMIN

# fix createClob() is not yet implemented, SQLFeatureNotSupportedException:
spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation=true
```

2b. Second step in booting webapp:
```
cd webapp
mvn clean install
mvn spring-boot:run
```

2c. For Swagger interface:
```http://localhost:8080/swagger-ui.html```

### 3. Stop initialization mode for further server boots by going to './webapp/src/main/resources/application.properties' and setting initialize.database to 'false'


### Theodor Amariucai, 2020
