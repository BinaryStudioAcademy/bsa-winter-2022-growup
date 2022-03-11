import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { ISkill } from 'common/interfaces/skill/skill';
import { SkillProps } from 'common/types/skills/skills';
import * as actions from './actions';

const SkillReducer = (builder: ActionReducerMapBuilder<any>): void => {
  builder.addCase(actions.fetchSkills.fulfilled, (state, action) => {
    if (action.payload) {
      state.allSkills = action.payload;
    }
  });

  builder.addCase(actions.fetchUserSkills.fulfilled, (state, action) => {
    if (action.payload) {
      state.userSkill = action.payload;
    }
  });

  builder.addCase(actions.createSkill.fulfilled, (state, action) => {
    const newAction: SkillProps = {
      ...action.payload[0],
      rating: ['', '', ''],
    };
    state.userSkill.push(newAction);
  });

  builder.addCase(actions.connectSkill.fulfilled, (state, action) => {
    const newAction: SkillProps = {
      ...action.payload[0],
      rating: ['', '', ''],
    };
    state.userSkill.push(newAction);
  });

  builder.addCase(actions.deleteSkill.fulfilled, (state, action) => {
    state.userSkill = state.userSkill.filter(
      (skill: ISkill) => skill.id !== action.payload,
    );
  });

  builder.addCase(actions.updateSkill.fulfilled, (state, action) => {
    const newAction: ISkill[] = state.userSkill.map((skill: ISkill) => {
      if (skill.id === action.payload.id) {
        return action.payload;
      }
      return skill;
    });
    state.userSkill = newAction;
  });
};

export default SkillReducer;
