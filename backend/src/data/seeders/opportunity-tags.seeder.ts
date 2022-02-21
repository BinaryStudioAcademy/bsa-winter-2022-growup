import { getCustomRepository } from 'typeorm';
import { tagsData } from '../seed-data/tags.data';
import OpportunitiesRepository from '../repositories/opportunity.repository';
import TagsRepository from '../repositories/tags.repository';
import { opporunities } from '../seed-data/opportunity.data';

export default class OpportunityTagSeeder {
  public static async execute(): Promise<void> {
    const opportunityRepository = getCustomRepository(OpportunitiesRepository);
    const tagRepositore = getCustomRepository(TagsRepository);
    for (let i = 0; i < opporunities.length; i++) {
      const opportunity = await opportunityRepository.findOne({
        name: opporunities[i].name,
      });
      const tag = await tagRepositore.findOne({
        name: tagsData[i].name,
      });
      opportunity.tags = [];
      tag.opportunities = [];
      opportunity.tags.push(tag);
      tag.opportunities.push(opportunity);
      await tag.save();
      await opportunity.save();
    }
  }
}
