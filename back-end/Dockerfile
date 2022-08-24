# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app

COPY KafkaFaker.BE.sln ./
COPY KafkaFaker.BE/*.csproj ./KafkaFaker.BE/
COPY KafkaFaker.BE.Api/*.csproj ./KafkaFaker.BE.Api/
COPY KafkaFaker.BE.Migrations/*.csproj ./KafkaFaker.BE.Migrations/
COPY KafkaFaker.BE.Models/*.csproj ./KafkaFaker.BE.Models/

RUN dotnet restore

COPY . .
RUN dotnet publish KafkaFaker.BE.Api/KafkaFaker.BE.Api.csproj -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "KafkaFaker.BE.Api.dll"]