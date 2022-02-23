import { createAsyncThunk } from '@reduxjs/toolkit';
// import { Skill } from '../../../../backend/src/data/entities/skill';
// import { useAppDispatch } from 'hooks/hooks';
import { skills } from 'services';
import { ActionType } from './common';
// import { actions } from './slice';

// const dispatch = useAppDispatch();

// type skillsCreation = Pick<Skill, 'company' | 'name' | 'type'>

const fetchSkills = createAsyncThunk(
  ActionType.FETCH_SKILL,
  async (_, { rejectWithValue }) => {
    try {
      const result = await skills.fetchSkill();
      if (result) {
        alert(result);
        // dispatch(actions.GET_SKILLS([{
        //     id: '10',
        //     name: '19',
        //     userId: '1',
        //     rating: ['2', '', '2'],
        // }]));
      }
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

// const createSkills = createAsyncThunk(
//     ActionType.CREATE_SKILLS,
//     async (data: skillsCreation[], { rejectWithValue }) => {
//         try {
//             const result = await skills.createSkills(data.map((skill) => skill.name));
//             return result;
//         } catch (err) {
//             return rejectWithValue(err);
//         }
//     },
// );

export { fetchSkills };
