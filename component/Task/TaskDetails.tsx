import { VStack, Text, HStack, Switch, Textarea, Input, Select, List, ListItem } from '@chakra-ui/react';
import React from 'react'
import { Task, Frequency, FrequencyString } from '../../hooks/types/task'
import { lastUpdated } from '../../utils/task.utils'
import { toHHMMDisplay } from '../../utils/time.utils';
import { TimeInput } from '../TimeInput';

type TaskDetailsProps = {
  task: Task;
  readOnly: boolean;
  updateTask: (value: string | boolean | number, key: string) => void;
}

export const TaskDetails = ({ task, readOnly, updateTask }: TaskDetailsProps) => {
  const getReadOnly = () => (
    <VStack alignItems={'start'}>
      <Text>Name: {task.name}</Text>
      <Text>Description: {task.description}</Text>
      <Text>Amount complete: {task.percentComplete.toFixed(1)}%</Text>
      <Text>Duration: {toHHMMDisplay(task.duration)} every {FrequencyString[task.frequency]}</Text>
      <Text>{lastUpdated(task.lastUpdated)}</Text>
      <HStack>
        <Text color={'blackAlpha.500'} fontWeight='bold'>Active</Text>
        <Switch isChecked={task?.active} disabled />
      </HStack>
    </VStack>
  )
  const getEdit = () => {
    return (
      <>
        <Input
          value={task?.name}
          onChange={(event) => updateTask(event?.target?.value, 'name')}
          color="blackAlpha.700"
          borderColor={'facebook.900'}
        />
        <Textarea
          value={task?.description}
          onChange={(event) => updateTask(event?.target?.value, 'description')}
          placeholder='Enter some details about this task...'
          color="blackAlpha.700"
          borderColor={'facebook.900'}
          size='sm'
        />
        <TimeInput setMinuteValue={(value) => updateTask(value, 'duration')} initalValue={task?.duration} />
        <Select placeholder='Select...' onChange={({ target: { value } }) => updateTask(value, 'frequency')} value={task.frequency}>
          <option value={0}>Daily</option>
          <option value={1}>Weekly</option>
          <option value={2}>Monthly</option>
        </Select>
        <HStack>
          <Text color={'blackAlpha.500'} fontWeight='bold'>Active</Text>
          <Switch isChecked={task?.active} onChange={() => updateTask(!task?.active, 'active')} />
        </HStack>
      </>
    )
  }
  return (
    <VStack width={"100%"} spacing={3}>
      {
        readOnly ? getReadOnly() : getEdit()
      }
    </VStack>
  )
}