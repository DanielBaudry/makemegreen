# Make Me Green
Main repo for makemegreen


## Pour débuter

Installer les données de démo :

./scripts/manage.sh sandbox

Lancer l'application :

docker-compose build
docker-compose up

La webapp est accessible à l'adresse suivante : [localhost:3000](http://localhost:3000)


## Pour insérer des données en base:

insert into footprint VALUES (3, 1,'2018-09-29 16:06:42.434928', 'waste', 120, null,null,null);
insert into recommendation VALUES (1, 4, 'Vive le vélo','Un vélo ça polue vraiment moins quand même !',20,2,60,'carbon','2018-09-29 16:06:42.434928');
insert into recommendation VALUES (2, 4, 'Prends une douche','Arrêtes les bains et prends des douches !',3,1,120,'water','2018-09-29 16:06:42.434928');
insert into recommendation VALUES (3, 4, 'Achète du verre non teinté','Le seul verre recyclable !',7,2,30,'waste','2018-09-29 16:06:42.434928');


## Pour déployer le front:

export API_URL=https://api.makemegreen.fr
export THUMBS_URL=https://api.makemegreen.fr/storage/assets/

yarn build && ./build-webapp.sh && netlify deploy


## Pour se connecter à l'API:

curl -O https://cli-dl.scalingo.io/install && bash install
scalingo -a [app_name] pgsql-console
