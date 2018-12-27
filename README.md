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

insert into footprint VALUES (3, 1,'2018-12-27 16:06:42.434928', 'waste', 120, null,null,null);
insert into recommendation VALUES (1, 4, 'Vive le vélo','Un vélo ça polue vraiment moins quand même !',20,2,60,'carbon','2018-09-29 16:06:42.434928');
insert into recommendation VALUES (2, 4, 'Prends une douche','Arrêtes les bains et prends des douches !',3,1,120,'water','2018-09-29 16:06:42.434928');
insert into recommendation VALUES (3, 4, 'Achète du verre non teinté','Le seul verre recyclable !',7,2,30,'waste','2018-09-29 16:06:42.434928');
insert into recommendation VALUES (4, 1, 'Eponge durable','Acheter une éponge durable c''est cool !',2,1,40,'waste','2018-10-27 18:37:42.434928');
insert into recommendation VALUES (5, 1, 'Brosse a dent durable','Acheter une brosse a dent durable c''est cool !',2,2,60,'waste','2018-10-27 18:37:42.434928');
insert into recommendation VALUES (6, 1, 'Dentifrice solide','Acheter du dentifrice solide c''est cool !',6,2,45,'waste','2018-10-27 18:37:42.434928');
insert into recommendation VALUES (7, 1, 'Je pense à éteindre mon frigo pendant mes vacances','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla bibendum feugiat eleifend. Vivamus non condimentum mauris. Pellentesque venenatis mauris quis diam dapibus, at dignissim turpis commodo. Pellentesque lacinia, lorem vitae faucibus efficitur, justo nulla ornare purus, ac ultricies magna nulla vel dolor. Sed tempor finibus sapien. Donec rutrum odio mi, in tempus est sollicitudin eget. Duis mollis arcu dui, sit amet feugiat orci laoreet non. In bibendum diam nec dui aliquam maximus. Nullam ac justo sem. Curabitur at ante porta, efficitur leo in, lacinia dui. In nec lectus in mauris vulputate gravida. Suspendisse quis feugiat leo, et luctus nibh. Praesent diam felis, dignissim nec ante vitae, laoreet accumsan diam.',6,2,45,'carbon','2018-12-12 18:37:42.434928');


Initialisation de la table property:

insert into property VALUES (1, 'bath_or_shower','2018-12-27 16:06:42.434928');
insert into property VALUES (2, 'bath_shower_frequency','2018-12-27 16:06:42.434928');
insert into property VALUES (3, 'carpooling_frequency','2018-12-27 16:06:42.434928');
insert into property VALUES (4, 'clothes_composition','2018-12-27 16:06:42.434928');
insert into property VALUES (5, 'green_garbage','2018-12-27 16:06:42.434928');
insert into property VALUES (6, 'personal_vehicule_consumption','2018-12-27 16:06:42.434928');
insert into property VALUES (7, 'personal_vehicule_frequency','2018-12-27 16:06:42.434928');
insert into property VALUES (8, 'plain_frequency','2018-12-27 16:06:42.434928');
insert into property VALUES (9, 'public_transportation_frequency','2018-12-27 16:06:42.434928');
insert into property VALUES (10, 'red_meat_frequency','2018-12-27 16:06:42.434928');
insert into property VALUES (11, 'train_frequency','2018-12-27 16:06:42.434928');
insert into property VALUES (12, 'white_meat_frequency','2018-12-27 16:06:42.434928');
insert into property VALUES (13, 'yellow_garbage','2018-12-27 16:06:42.434928');

## Pour déployer le front:

Télécharger node
Télécharger yarn: https://yarnpkg.com/fr/
npm install -g netlify-cli@1.2.3
### Se positionner dans le répertoire green-client
[à la première utilisation seulement : yarn install]

export API_URL=https://api.makemegreen.fr
export THUMBS_URL=https://api.makemegreen.fr/storage/assets/
rm -rf node_modules/ build/
yarn install && yarn build && ./build-webapp.sh && netlify -e testing deploy
yarn build && ./build-webapp.sh && netlify -e production deploy


## Pour se connecter à l'API:

curl -O https://cli-dl.scalingo.io/install && bash install
scalingo -a [app_name] pgsql-console

