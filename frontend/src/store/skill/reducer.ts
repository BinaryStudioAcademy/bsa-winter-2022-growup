import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { ISkill } from 'common/interfaces/skill/skill';
import * as actions from './actions';
import { State } from './common';

const SkillReducer = (builder: ActionReducerMapBuilder<State>): void => {
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

  builder.addCase(
    actions.fetchUserCareerPathSkills.fulfilled,
    (state, action) => {
      if (action.payload) {
        const careerPathSkills = action.payload?.map((skill) => {
          return { ...skill, isFromCareerPath: true };
        });
        state.careerPathSkills = careerPathSkills;
      }
    },
  );

  builder.addCase(actions.createSkill.fulfilled, (state, action) => {
    if (action.payload) {
      const newAction: ISkill = {
        ...action.payload,
        rating: ['', '', ''],
      };
      state.userSkill.push(newAction);
    }
  });

  builder.addCase(actions.connectSkill.fulfilled, (state, action) => {
    if (action.payload) {
      const newAction: ISkill = {
        ...action.payload,
        rating: ['', '', ''],
      };
      state.userSkill.push(newAction);
    }
  });

  builder.addCase(actions.deleteSkill.fulfilled, (state, action) => {
    state.userSkill = state.userSkill.filter(
      (skill: ISkill) => skill.id !== action.payload,
    );
  });

  builder.addCase(actions.updateSkill.fulfilled, (state, action) => {
    const newAction: ISkill[] = state.userSkill.map((skill: ISkill) => {
      if (action.payload)
        if (skill.id === action.payload.id) {
          return action.payload;
        }
      return skill;
    });
    state.userSkill = newAction;
  });

  builder.addCase(actions.updateCareerPathSkill.fulfilled, (state, action) => {
    const newAction: ISkill[] = state.userSkill.map((skill: ISkill) => {
      if (action.payload)
        if (skill.id === action.payload.id) {
          return { ...action.payload, isFromCareerPath: true };
        }
      return skill;
    });
    state.userSkill = newAction;
  });
};

export default SkillReducer;
