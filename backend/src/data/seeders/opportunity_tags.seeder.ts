import { getCustomRepository } from 'typeorm';
import { tagsData } from '../seed-data/tags.data';
import OpportunitiesRepository from '../repositories/opportunity.repository';
import TagsRepository from '../repositories/tags.repository';
import { opporunities } from '../seed-data/opportunity.data';
// import { Opportunity_Tag } from '../entities/opportunity_tag';

export default class OpportunityTagSeeder {
  public static async execute(): Promise<void> {
    const opportunityRepository = getCustomRepository(OpportunitiesRepository);
    const tagRepositore = getCustomRepository(TagsRepository);
    const opportunity = await opportunityRepository.findOne({
      name: opporunities[0].name,
    });
    const tag = await tagRepositore.findOne({
      name: tagsData[0].name,
    });
    opportunity.tags = [];
    tag.opportunities = [];
    opportunity.tags.push(tag);
    tag.opportunities.push(opportunity);
    await tag.save();
    await opportunity.save();
    // await asyncForEach(async (oppTag: Opportunity_Tag) => {
    //   const tag = await opportunityRepository.findOne({name: opporunities[0].name,});
    //   const opportunity = await opportunityRepository.findOne({name: opporunities[0].name,});
    //   await Object.assign(new Opportunity_Tag(), {
    //     ...oppTag,
    //     opportunityId:opportunitie.id,
    //     tagsId:tag.id,
    //     relations:['opportunity','tags'],
    //   }).save();
    // },opp_tags as Opportunity_Tag[]);
  }
}
