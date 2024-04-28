import { Container } from "inversify";

import { KafkaApplication } from "../../kafka/application/kakfa.application";
import { KafkaRepository } from "../../kafka/domain/repositories/kafka.repository";
import { KafkaInfrastructure } from "../../kafka/infrastructure/kafka.infrastructure";

const container = new Container();
container.bind<KafkaApplication>("KafkaApplication").to(KafkaApplication);
container.bind<KafkaRepository>("KafkaRepository").to(KafkaInfrastructure);

//console.log("container initialize", container);

export { container };
