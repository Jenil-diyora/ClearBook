# Stage 1: Build the React frontend
FROM node:18-alpine AS node-build
WORKDIR /clientapp
COPY src/Billing.WebApp/ClientApp/package*.json ./
RUN npm install --legacy-peer-deps
COPY src/Billing.WebApp/ClientApp/ ./
RUN npm run build

# Stage 2: Build the .NET backend
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS dotnet-build

WORKDIR /src

# Restore NuGet packages
COPY src/Billing.WebApp/Billing.WebApp.csproj ./src/Billing.WebApp/
RUN dotnet restore src/Billing.WebApp/Billing.WebApp.csproj

# Copy all backend source
COPY src/Billing.WebApp/ ./src/Billing.WebApp/

# Copy the pre-built React app into ClientApp/build so PublishRunWebpack finds it
COPY --from=node-build /clientapp/build ./src/Billing.WebApp/ClientApp/build/

# Publish with SKIP_NPM_BUILD=true to bypass npm install/build in the .csproj target
RUN SKIP_NPM_BUILD=true dotnet publish src/Billing.WebApp/Billing.WebApp.csproj -c Release -o /app/publish

# Stage 3: Lightweight runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 80

COPY --from=dotnet-build /app/publish .

ENV ASPNETCORE_URLS=http://+:80
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "Billing.WebApp.dll"]