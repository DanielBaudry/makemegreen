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
insert into recommendation VALUES (1, 1, 'Vive le vélo','Un vélo ça polue vraiment moins quand même !',20,2,60,'carbon','2018-09-29 16:06:42.434928');
insert into recommendation VALUES (1, 1, 'Vive le vélo','Un vélo ça polue vraiment moins quand même !',20,2,60,'carbon','2018-09-29 16:06:42.434928');
insert into recommendation VALUES (1, 1, 'Vive le vélo','Un vélo ça polue vraiment moins quand même !',20,2,60,'carbon','2018-09-29 16:06:42.434928');