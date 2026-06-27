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

# Copy project files and restore
COPY src/Billing.WebApp/Billing.WebApp.csproj ./src/Billing.WebApp/
RUN dotnet restore src/Billing.WebApp/Billing.WebApp.csproj

# Copy all backend source
COPY src/Billing.WebApp/ ./src/Billing.WebApp/

# Inject built React app into wwwroot
COPY --from=node-build /clientapp/build ./src/Billing.WebApp/wwwroot/

# Publish the .NET app
RUN dotnet publish src/Billing.WebApp/Billing.WebApp.csproj -c Release -o /app/publish

# Stage 3: Lightweight runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 80

COPY --from=dotnet-build /app/publish .

ENV ASPNETCORE_URLS=http://+:80
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "Billing.WebApp.dll"]