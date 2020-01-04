<?php

namespace App\Controller;

use App\Entity\Todo;
use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
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
     * @Route("/read", name="api_todo_read")
     */
    public function index(): Response
    {
        $todos = $this->todoRepository->findAll();

        $arrayOfTodos = [];
        /** @var Todo $todo */
        foreach ($todos as $todo) {
            $arrayOfTodos[] = $todo->toArray();
        }

        return $this->json($arrayOfTodos);
    }
}
