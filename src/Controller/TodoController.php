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
    private TodoRepository $todoRepository;

    /**
     * @var EntityManagerInterface
     */
    private EntityManagerInterface $entityManager;

    public function __construct(TodoRepository $todoRepository, EntityManagerInterface $entityManager)
    {
        $this->todoRepository = $todoRepository;
        $this->entityManager = $entityManager;
    }

    /**
     * @Route("/create", name="api_todo_create")
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request): JsonResponse
    {
        $content = json_decode($request->getContent(), false, 512, JSON_THROW_ON_ERROR);
        $todo = new Todo();
        $todo->setName($content->name);

        try {
            $this->entityManager->persist($todo);
            $this->entityManager->flush();

            return $this->json([
                'todo' => $todo->toArray()
            ]);
        }catch (Exception $exception) {
            return $this->json([
                'error' => $exception->getMessage()
            ]);
        }
    }

    /**
     * @Route("/read", name="api_todo_read")
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
     * @Route("/update", name="api_todo_update")
     */
    public function update(): void
    {

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
            // error message later
        }

        return $this->json([
            'message' => 'Todo has been deleted!'
        ]);
    }
}
