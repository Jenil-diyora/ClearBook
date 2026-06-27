# Stage 1: Build the React frontend
FROM node:18-alpine AS node-build
WORKDIR /clientapp
COPY src/Billing.WebApp/ClientApp/package*.json ./
RUN npm install --legacy-peer-deps
COPY src/Billing.WebApp/ClientApp/ ./
RUN npm run build

# Stage 2: Build the .NET backend
# Use the .NET SDK image + Node.js so the csproj npm targets don't fail
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS dotnet-build

# Install Node.js 18 so the PublishRunWebpack target can call npm
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs --no-install-recommends

WORKDIR /src

# Restore NuGet packages
COPY src/Billing.WebApp/Billing.WebApp.csproj ./src/Billing.WebApp/
RUN dotnet restore src/Billing.WebApp/Billing.WebApp.csproj

# Copy all backend source
COPY src/Billing.WebApp/ ./src/Billing.WebApp/

# Copy the pre-built React app so npm run build in csproj finds it already done
COPY --from=node-build /clientapp/build ./src/Billing.WebApp/ClientApp/build/

# Copy node_modules from node-build stage so npm install is already satisfied
COPY --from=node-build /clientapp/node_modules ./src/Billing.WebApp/ClientApp/node_modules/

# Publish the .NET app; the PublishRunWebpack target will find npm + existing build files
RUN dotnet publish src/Billing.WebApp/Billing.WebApp.csproj -c Release -o /app/publish

# Stage 3: Lightweight runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 80

COPY --from=dotnet-build /app/publish .

ENV ASPNETCORE_URLS=http://+:80
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "Billing.WebApp.dll"]