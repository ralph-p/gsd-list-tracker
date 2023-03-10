import { AddIcon } from '@chakra-ui/icons'
import { Button, Checkbox, Input, Spinner, Table, Tbody, Td, Textarea, Tfoot, Th, Tr, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useGSDContext } from '../../context/context'
import TaskNoteModal from './TaskNoteModal'

type Props = {}

export const SubTask = (props: Props) => {
  const { addSubtask, task } = useGSDContext();
  if (!task) return <Spinner />
  const [newSubtask, setNewSubtask] = useState({ name: '', description: '' })
  const [showNewSubtask, setShowNewSubtask] = useState(false)
  const [noteTaskName, setNoteTaskName] = useState('')
  const createSubtask = () => {
    addSubtask(task?.id, newSubtask.name, newSubtask.description)
    setNewSubtask({ name: '', description: '' })
    setShowNewSubtask(false)
  }
  const updateNewSubtaskState = (value: string | boolean, key: string) => {
    setNewSubtask({ ...newSubtask, [key]: value })
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  const openNoteModal = (subtaskName: string) => {
    setNoteTaskName(subtaskName)
    onOpen();
  }
  const closeNoteModal = () => {
    setNoteTaskName('')
    onClose();
  }

  return (
    <>
      {/* Need the conditional render so the modal's use effect sets the input value to the subtask name */}
      {isOpen && <TaskNoteModal isOpen={isOpen} onClose={closeNoteModal} noteString={noteTaskName} />}
      {
        showNewSubtask ? (<>
          <Input
            value={newSubtask.name}
            placeholder={'Subtask name'}
            onChange={(event) => updateNewSubtaskState(event?.target?.value, 'name')}
          />
          <Textarea
            value={newSubtask.description}
            placeholder={'Subtask Description'}
            onChange={(event) => updateNewSubtaskState(event?.target?.value, 'description')}

          />
          <Button onClick={createSubtask}>Save Subtask</Button>
        </>) : <><Button onClick={() => setShowNewSubtask(true)}>New Subtask</Button> <Button onClick={() => openNoteModal('')}>Add Note</Button></>
      }

      <Table size="sm" variant="unstyled" backgroundColor={'gray.100'} borderRadius=".5em">
        <Tbody>
          <Th>Name</Th>
          <Th>Description</Th>
          <Th>Complete</Th>
          <Th>Add Note</Th>
          {
            task.subtasks?.map((subtask) => (
              <Tr>
                <Td>{subtask.name}</Td>
                <Td>{subtask.description}</Td>
                <Td><Checkbox isChecked={subtask.complete} /></Td>
                <Td><AddIcon boxSize={3} onClick={() => openNoteModal(subtask.name)} cursor="pointer" /></Td>
              </Tr>
            ))
          }
        </Tbody>
      </Table>
    </>
  )
}