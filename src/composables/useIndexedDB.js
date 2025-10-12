const DB_NAME = "DatalabsVoucherDB";
const DB_VERSION = 1;
const STORE_NAME = "quizAttempts";

let db = null;

const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(new Error("Failed to open IndexedDB"));
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      db = event.target.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const objectStore = db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });

        objectStore.createIndex("assessmentId", "assessmentId", {
          unique: false,
        });
        objectStore.createIndex("completedAt", "completedAt", {
          unique: false,
        });
        objectStore.createIndex("score", "score", { unique: false });
      }
    };
  });
};

export const useIndexedDB = () => {
  const saveAttempt = async (attemptData) => {
    if (!db) await initDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const objectStore = transaction.objectStore(STORE_NAME);

      const attempt = {
        assessmentId: attemptData.assessmentId,
        assessmentTitle: attemptData.assessmentTitle,
        score: attemptData.score,
        totalQuestions: attemptData.totalQuestions,
        percentage: attemptData.percentage,
        timeSpent: attemptData.timeSpent || 0,
        completedAt: new Date().toISOString(),
      };

      const request = objectStore.add(attempt);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(new Error("Failed to save attempt"));
      };
    });
  };

  const getAllAttempts = async () => {
    if (!db) await initDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const objectStore = transaction.objectStore(STORE_NAME);
      const request = objectStore.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(new Error("Failed to get attempts"));
      };
    });
  };

  const getAttemptsByAssessment = async (assessmentId) => {
    if (!db) await initDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const objectStore = transaction.objectStore(STORE_NAME);
      const index = objectStore.index("assessmentId");
      const request = index.getAll(assessmentId);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(new Error("Failed to get attempts by assessment"));
      };
    });
  };

  return {
    initDB,
    saveAttempt,
    getAllAttempts,
    getAttemptsByAssessment,
  };
};

