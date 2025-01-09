#!/bin/bash

# Démarrer les conteneurs Docker Compose en arrière-plan
docker compose up -d mongo
# Attendre que le service MongoDB soit prêt
echo "Attente du démarrage du service MongoDB..."
while !docker exec -i mongo-db sh -c mongosh --eval "db.stats()" &> /dev/null; do
    sleep 2
done

echo "Le service MongoDB est prêt."
docker exec -i mongo-db bash -c 'mongosh --username gabixadmin --password gabixadmin --file /var/scripts/reset-database.js'
echo "reset database finished"
docker compose down api
docker compose up api


