<?php

namespace App\Controller;

use App\Entity\Todo;
use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use JsonException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/todo")
 */
class TodoController extends AbstractController
{

    /**
     * @var TodoRepository
     */
    private $todoRepository;

    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    public function __construct(TodoRepository $todoRepository, EntityManagerInterface $entityManager)
    {
        $this->todoRepository = $todoRepository;
        $this->entityManager = $entityManager;
    }

    /**
     * @Route("/create", name="api_todo_create", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     * @throws JsonException
     */
    public function create(Request $request): JsonResponse
    {

        /** @var string $requestContent */
        $requestContent = $request->getContent();

        $content = json_decode($requestContent, false, 512, JSON_THROW_ON_ERROR);
        $todo = new Todo();
        $todo->setTask($content->task);
        $todo->setDescription($content->description);

        try {
            $this->entityManager->persist($todo);
            $this->entityManager->flush();
        }catch (Exception $exception) {
            return $this->json([
                'message' => [
                    'level' => 'error',
                    'text' =>  [
                        'Could not reach database when attempting to create a To-Do.'
                    ]
                ]
            ]);
        }

        return $this->json([
            'todo' => $todo->toArray(),
            'message' => [
                'level' => 'success',
                'text' => [
                    'Todo has been created!',
                    'Task: ' . $content->task
                ]
            ]
        ]);
    }

    /**
     * @Route("/read", name="api_todo_read", methods={"GET"})
     */
    public function read(): JsonResponse
    {
        $todos = $this->todoRepository->findAll();

        $arrayOfTodos = [];
        foreach ($todos as $todo) {
            $arrayOfTodos[] = $todo->toArray();
        }

        return $this->json($arrayOfTodos);
    }

    /**
     * @Route("/update/{id}", name="api_todo_update",  methods={"PUT"})
     * @param Todo    $todo
     * @param Request $request
     * @return JsonResponse
     * @throws JsonException
     */
    public function update(Todo $todo, Request $request): JsonResponse
    {
        /** @var string $requestContent */
        $requestContent = $request->getContent();

        $content = json_decode($requestContent, false, 512, JSON_THROW_ON_ERROR);

        if ($todo->getTask() === $content->task && $todo->getDescription() === $content->description) {
            return $this->json([
                'message' => [
                    'text' => 'There was no change to the To-Do. Neither the task or the description was changed.'
                ]
            ]);
        }

        $todo->setTask($content->task);
        $todo->setDescription($content->description);

        try {
            $this->entityManager->flush();
        }catch (Exception $exception) {
            return $this->json([
                'message' => [
                    'level' => 'error',
                    'text' =>  [
                        'Could not reach database when attempting to update a To-Do.'
                    ]
                ]
            ]);
        }

        return $this->json([
            'todo' => $todo->toArray(),
            'message' => [
                'level' => 'success',
                'text' => [
                    'Todo has been updated!'
                ]
            ]
        ]);
    }

    /**
     * @Route("/delete/{id}", name="api_todo_delete", methods={"DELETE"})
     * @param Todo $todo
     * @return JsonResponse
     */
    public function delete(Todo $todo): JsonResponse
    {
        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        } catch (Exception $exception) {
            return $this->json([
                'message' => [
                    'level' => 'error',
                    'text' =>  [
                        'Could not reach database when attempting to delete a To-Do.'
                    ]
                ]
            ]);
        }

        return $this->json([
            'message' => ['text' => 'To-Do has successfully been deleted!', 'level' => 'success']
        ]);
    }
}
