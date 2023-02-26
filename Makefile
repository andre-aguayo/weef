args=

api_first_init:
	cp .env.example .env
	yarn install
	docker compose up -d
	make api_migrations_run
	make api_seeder_run

api_yarn:
	docker compose run api bash -c "yarn ${args}"

api_migrations_generate:
	docker-compose exec api bash -c "yarn typeorm migration:generate -d src/config/typeorm-cli.ts ./src/migrations/version"
	sudo chown -R ${USER} src/migrations

api_migrations_run:
	docker-compose exec api bash -c "yarn typeorm migration:run -d src/config/typeorm-cli.ts -t each"

api_seeder_run:
	docker-compose exec api bash -c "SEEDERS=1 yarn typeorm migration:run -d src/config/typeorm-cli.ts"

api_test:
	docker-compose exec api bash -c "yarn test"
