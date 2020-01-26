<?php

namespace App\Controller;

use App\Entity\Todo;
use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
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
     */
    public function create(Request $request): JsonResponse
    {

        /** @var string $requestContent */
        $requestContent = $request->getContent();

        $content = json_decode($requestContent, false, 512, JSON_THROW_ON_ERROR);
        $todo = new Todo();
        $todo->setName($content->name);

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
                    'Task: ' . $content->name
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
        /** @var Todo $todo */
        foreach ($todos as $todo) {
            $arrayOfTodos[] = $todo->toArray();
        }

        return $this->json($arrayOfTodos);
    }

    /**
     * @Route("/update/{id}", name="api_todo_update",  methods={"PUT"})
     * @param Todo $todo
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Todo $todo, Request $request): JsonResponse
    {
        /** @var string $requestContent */
        $requestContent = $request->getContent();

        $content = json_decode($requestContent, false, 512, JSON_THROW_ON_ERROR);
        $todo->setName($content->name);

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
            'level' => 'success',
            'text' => [
                'Todo has been deleted!'
            ]
        ]);
    }
}
