import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { State } from './common';
import * as actions from './actions';

const CareerPathReducer = (builder: ActionReducerMapBuilder<State>): void => {
  builder.addCase(actions.fetchAllLevels.pending, (state, _) => {
    state.isLoading = true;
  });

  builder.addCase(actions.fetchAllLevels.rejected, (state, _) => {
    state.isLoading = false;
  });

  builder.addCase(actions.fetchAllLevels.fulfilled, (state, action) => {
    state.isLoading = false;
    state.levels = action.payload;
  });

  builder.addCase(actions.fetchDomains.pending, (state, _) => {
    state.isLoading = true;
  });

  builder.addCase(actions.fetchDomains.rejected, (state, _) => {
    state.isLoading = false;
  });

  builder.addCase(actions.fetchDomains.fulfilled, (state, action) => {
    state.isLoading = false;
    state.domains = action.payload;
  });

  builder.addCase(actions.createDomain.fulfilled, (state, action) => {
    state.isLoading = false;
    if (action.payload) {
      state.domains?.push(action.payload);
    }
  });

  builder.addCase(actions.updateDomain.fulfilled, (state, action) => {
    if (action.payload) {
      const domain = state.domains?.find(
        (domain) => domain.domain.id === action.payload?.id,
      );
      if (domain) {
        domain.domain.name = action.payload.name;
      }
    }
  });

  builder.addCase(actions.deleteDomain.fulfilled, (state, action) => {
    if (action.payload && state.domains) {
      state.domains = state.domains?.filter(
        (domain) => domain.domain.id !== action.payload?.id,
      );
    }
  });

  builder.addCase(actions.createLevel.fulfilled, (state, action) => {
    if (action.payload) {
      const domain = state.domains?.find(
        (domain) => domain.domain.id === action.meta.arg.domainId,
      );
      if (domain) {
        domain.levels.push(action.payload);
      }
    }
  });

  builder.addCase(actions.updateLevel.fulfilled, (state, action) => {
    if (action.payload) {
      const domain = state.domains?.find(
        (domain) => domain.domain.id === action.meta.arg.domainId,
      );
      const level = domain?.levels.find(
        (level) => level.id === action.payload?.id,
      );

      if (level) {
        level.name = action.payload.name;
      }
    }
  });

  builder.addCase(actions.deleteLevel.fulfilled, (state, action) => {
    if (action.payload) {
      const domain = state.domains?.find(
        (domain) => domain.domain.id === action.meta.arg.domainId,
      );

      if (domain?.levels) {
        domain.levels = domain.levels?.filter(
          (level) => level.id !== action.payload?.id,
        );
      }
    }
  });

  builder.addCase(actions.createSkill.fulfilled, (state, action) => {
    const domain = state.domains?.find(
      (domain) => domain.domain.id === action.meta.arg.domainId,
    );
    const level = domain?.levels.find(
      (level) => level.id === action.meta.arg.levelId,
    );

    if (level && action.payload) {
      if (level.skills) {
        level.skills.push(action.payload);
      } else {
        level.skills = [action.payload];
      }
    }
  });

  builder.addCase(actions.updateSkill.fulfilled, (state, action) => {
    if (action.payload) {
      const domain = state.domains?.find(
        (domain) => domain.domain.id === action.payload?.domainId,
      );
      const level = domain?.levels.find(
        (level) => level.id === action.payload?.levelId,
      );
      const skill = level?.skills.find(
        (skill) => skill.id === action.payload?.id,
      );

      if (skill) {
        skill.name = action.payload.name;
      }
    }
  });

  builder.addCase(actions.deleteSkill.fulfilled, (state, action) => {
    if (action.payload) {
      const domain = state.domains?.find(
        (domain) => domain.domain.id === action.meta.arg.domainId,
      );
      const level = domain?.levels.find(
        (level) => level.id === action.meta.arg.levelId,
      );

      if (level?.skills) {
        level.skills = level.skills?.filter(
          (skill) => skill.id !== action.payload?.id,
        );
      }
    }
  });

  builder.addCase(actions.createObjective.fulfilled, (state, action) => {
    if (action.payload) {
      const domain = state.domains?.find(
        (domain) => domain.domain.id === action.meta.arg.domainId,
      );
      const level = domain?.levels.find(
        (level) => level.id === action.meta.arg.levelId,
      );
      const skill = level?.skills.find(
        (skill) => skill.id === action.meta.arg.skillId,
      );

      if (skill && action.payload) {
        if (skill.objectives) {
          skill.objectives.push(action.payload);
        } else {
          skill.objectives = [action.payload];
        }
      }
    }
  });

  builder.addCase(actions.updateObjective.fulfilled, (state, action) => {
    if (action.payload) {
      const domain = state.domains?.find(
        (domain) => domain.domain.id === action.payload?.domainId,
      );
      const level = domain?.levels?.find(
        (level) => level.id === action.payload?.levelId,
      );
      const skill = level?.skills?.find(
        (skill) => skill.id === action.payload?.skillId,
      );
      const objective = skill?.objectives?.find(
        (objective) => objective.id === action.payload?.id,
      );

      if (objective) {
        objective.name = action.payload.name;
      }
    }
  });

  builder.addCase(actions.deleteObjective.fulfilled, (state, action) => {
    if (action.payload) {
      const domain = state.domains?.find(
        (domain) => domain.domain.id === action.meta.arg.domainId,
      );
      const level = domain?.levels.find(
        (level) => level.id === action.meta.arg.levelId,
      );
      const skill = level?.skills.find(
        (skill) => skill.id === action.meta.arg.skillId,
      );

      if (skill?.objectives) {
        skill.objectives = skill.objectives?.filter(
          (objective) => objective.id !== action.payload?.id,
        );
      }
    }
  });

  builder.addCase(actions.connectLevels.fulfilled, (state, action) => {
    if (action.payload) {
      const domain = state.domains?.find(
        (domain) => domain.domain.id === action.meta.arg.domainId,
      );

      const level = domain?.levels.find(
        (level) => level.id === action.payload?.level.id,
      );

      const nextLevel = action.payload.nextLevel;

      if (level && nextLevel) {
        level.nextLevel = level.nextLevel.concat(nextLevel);
      }
    }
  });

  builder.addCase(actions.disconnectLevels.fulfilled, (state, action) => {
    if (action.payload) {
      const domain = state.domains?.find(
        (domain) => domain.domain.id === action.meta.arg.domainId,
      );

      const level = domain?.levels.find(
        (level) => level.id === action.meta.arg.levelId,
      );

      if (level?.nextLevel) {
        level.nextLevel = level.nextLevel.filter(
          (next) => next.id !== action.meta.arg.nextLevelId,
        );
      }
    }
  });

  // builder.addCase(actions.connectDomains.fulfilled, (state, action) => {
  //   if (action.payload) {
  //     const domain = state.domains?.find(
  //       (domain) => domain.domain.id === action.meta.arg.domainId,
  //     );

  //     if (domain){
  //       domain.nextDomain = action.payload.nextDomain;
  //     }
  //   }
  // });

  // builder.addCase(actions.disconnectDomains.fulfilled, (state, action) => {
  //   if (action.payload) {
  //     const domain = state.domains?.find(
  //       (domain) => domain.domain.id === action.meta.arg.domainId,
  //     );

  //     if (domain){
  //       domain.nextDomain = null;
  //     }
  //   }
  // });
};

export default CareerPathReducer;
